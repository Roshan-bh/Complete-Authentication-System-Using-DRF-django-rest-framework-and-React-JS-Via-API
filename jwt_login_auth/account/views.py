from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import (UserRegistrationSerializer,UserLoginSerializer,
UserProfileSerializer,UserChangePasswordSerializer,
ResetPasswordSerializer,UserPasswordResetSerializer)
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .renderers import UserRenderer

def get_tokens_for_user(user):
    refresh=RefreshToken.for_user(user)
    return{
        'refresh':str(refresh),
        'access':str(refresh.access_token),
    }

# Create your views here.
class UserRegistrationView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,format=None):
        serializer=UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            token=get_tokens_for_user(user)
            return Response({'msg':'registration success!','token':token},status=status.HTTP_201_CREATED)
        return Response({'msg':serializer.errors},status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,format=None):
        serializer= UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=request.data.get('email')
            password=request.data.get('password')
            user=authenticate(email=email,password=password)
            if user is not None:
                token=get_tokens_for_user(user)
                return Response({'msg':'Login Successfully !','token':token},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['User doesnot exits!']}},status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request,format=None):
        serializer=UserProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

class UserChangePasswordView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=UserChangePasswordSerializer(data=request.data,context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'password change successfully!'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_200_OK)

class ResetPasswordEmailView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,format=None):
        serializer=ResetPasswordSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password reset link send check your email..'},status=status.HTTP_200_OK)
            #not need to write else part cause raise exception is true so either if executed or exception generated.

class UserPasswordResetView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,uid,token,format=None):
        serializer=UserPasswordResetSerializer(data=request.data,context={'uid':uid,'token':token})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'password reset successfully!!'},status=status.HTTP_200_OK)