from rest_framework import serializers
from rest_framework.response import Response
from .models import User
from .utils import Util
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.utils.encoding import force_bytes,smart_str,DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model=User
        fields=['name', 'email', 'tc', 'password', 'password2']
        extra_kwargs={
            'password':{'write_only':True}
        }

    def validate(self,attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        if(password!=password2):
            raise serializers.ValidationError("Both Password Field Must Be Same..")
        return attrs

    def create(self,Validate_data):
        return User.objects.create_user(**Validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=User
        fields=['email','password']
       
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','name','email']

class UserChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    class Meta:
        fields=['password','password2']

    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        user=self.context.get('user')
        if(password!=password2):
            raise serializers.ValidationError("Both password fields must be same..")
        user.set_password(password)
        user.save()
        return attrs

class ResetPasswordSerializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        fields=['email']

    def validate(self, attrs):
        email=attrs.get('email')
        user=User.objects.filter(email=email)
        if user.exists():
            uid=urlsafe_base64_encode(force_bytes(User.objects.get(email=email).id))
            print("uid",uid)
            token=PasswordResetTokenGenerator().make_token(User.objects.get(email=email))
            print("token",token)
            link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('password Reset Link', link)
            # Send Email 
            body='Click Following Link to Reset Your Password '+ link
            data={
                'subject':'Reset Your Password',
                'body':body,
                'to_email':User.objects.get(email=email).email
            }
            # Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError("you are not a registered user..")

class UserPasswordResetSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={
        'input_type':'password'
    },write_only=True)
    password2=serializers.CharField(max_length=255,style={
        'input_type':'password'
    },write_only=True)
    class Meta:
        fields=['password','password2']

    def validate(self, attrs):
        try:
            password=attrs.get('password')
            password2=attrs.get('password2')
            uid=self.context.get('uid')
            token=self.context.get('token')
            id=smart_str(urlsafe_base64_decode(uid))
            user=User.objects.get(id=id)
            if(password!=password2):
                raise serializers.ValidationError("Both password fields must be same..")
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError("Token is not valid or expired..")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError("Token is not valid or expired.")