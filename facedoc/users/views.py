from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from . import models
from rest_framework.parsers import MultiPartParser, FormParser

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):

        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            tokens=get_tokens_for_user(user)
            return Response({'token':tokens,'msg': 'Registration Success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):

        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password = serializer.data.get('password')
            user= authenticate(email=email, password=password)
            if user is not None:
                tokens = get_tokens_for_user(user)
                return Response({'token':tokens,'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class UserLogoutView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
        renderer_classes = [UserRenderer]
        permission_classes = [IsAuthenticated]

        def get(self, request, format=None):
            serializer = UserProfileSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UserRolesView(APIView):

    def get(self, request):
        serializer = RoleSerializer(models.RoleAssigned.objects.all() ,many = True)
        return Response(serializer.data)


class UserInfoView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        allUserinfo = models.UserInfo.objects.all()
        serializer = UserInfoSerializer(allUserinfo, many = True)

        return Response(serializer.data)

    def post(self, request, format = None):
        data = request.data
        serializer = UserInfoSerializer(data = data)

        if serializer.is_valid():
            print(data)
            serializer.save()
            return Response({'msg':'added'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
def userExists(request):
    if request.method == 'POST':
        serializer = UserCheckSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.data['email']
            phone = serializer.data['phone']
            if UserData.objects.filter(email=email).exists():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            if UserData.objects.filter(phone=phone).exists():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            if request.user.is_authenticated:
                return Response({'msg': 'Already Logged in'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_200_OK)

    if request.method == 'GET':
        serializer = UserCheckSerializer(models.UserData.objects.only('email') ,many = True)

    return Response(serializer.data)


class ChangePasswordView(generics.UpdateAPIView):

    queryset = UserData.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

class UpdateProfileView(generics.UpdateAPIView):

    queryset = UserData.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer



