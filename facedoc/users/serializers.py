import  re
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


class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserData
    fields = ['id', 'email', 'fname','mname','lname','phone','role']


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleAssigned
        fields = ['id','name']


class UserCheckSerializer(serializers.Serializer):
    email = serializers.CharField(required=False, allow_blank=True, max_length=100)


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id','name']

