import  re

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import UserData, RoleAssigned, UserInfo

class UserRegistrationSerializer(serializers.ModelSerializer):

    password2=serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model=UserData
        fields=['email','fname','mname','lname','phone','role','password','password2']
        extra_kwargs={
            'password':{'write_only':True}
        }

        # validation password and confirm password
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password does not match.")
        if re.findall('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$',password):
            pass
        else:
            raise serializers.ValidationError("Password must Contain 1 Uppercase character, 1 Lowercase character, 1 digit, 1 symbol")
        return attrs

    def create(self,validate_data):
        return UserData.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=UserData
        fields=['email','password']


class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = UserData
        fields = ('email', 'fname', 'mname', 'lname', 'phone', 'role')
        extra_kwargs = {
            'fname': {'required': True},
            'mname': {'required': True},
            'lname': {'required': True},
            'phone': {'required': True},
            'role': {'required': True},
        }

    def validate_email(self, value):
        user = self.context['request'].user
        if UserData.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value

    def update(self, instance, validated_data):
        #instance.fname = validated_data['fname']
        #instance.mname = validated_data['mname']
        #instance.lname = validated_data['lname']
        instance.email = validated_data['email']
        instance.phone = validated_data['phone']
        instance.role = validated_data['role']
        instance.save()
        return instance


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleAssigned
        fields = ['id','name']


class UserProfileSerializer(serializers.ModelSerializer):
    role = serializers.SlugRelatedField(read_only=True, slug_field='name')
    class Meta:
        model = UserData
        fields = ['id', 'email', 'fname','mname','lname','phone','role']

class UserCheckSerializer(serializers.Serializer):
    email = serializers.CharField(required=False, allow_blank=True, max_length=100)


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['name', 'pancard', 'aadharcard', 'passport', 'driving_license']

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserData
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance