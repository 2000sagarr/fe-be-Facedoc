from django.db import models
from django.contrib.auth.models import  BaseUserManager, AbstractBaseUser
import os
'''
model : role
'''

class RoleAssigned(models.Model):
    name = models.CharField(max_length = 100)
    pancard = models.BooleanField(default = False)
    aadharcard = models.BooleanField(default = False)
    passpord = models.BooleanField(default = False)
    

    def __str__(self):
        return self.name

class UserManager(BaseUserManager):
    def create_user(self, email, fname, mname, lname,role, phone, password=None, password2=None ):

        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            fname=fname,
            mname=mname,
            lname=lname,
            phone=phone,
            role=role,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,  email, fname, mname, lname,phone, role, password=None):

        user = self.create_user(
            email,
            password=password,
            fname=fname,
            mname=mname,
            lname=lname,
            phone=phone,
            role=role,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


# user model
class UserData(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    fname = models.CharField(max_length=50)
    mname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    phone = models.IntegerField()
    role = models.ForeignKey(RoleAssigned, on_delete = models.CASCADE, null=True, blank=True, default=None)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname', 'mname', 'lname','phone', 'role']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class UserInfo(models.Model):

    def get_image_path(instance, filename):
        return os.path.join('userFiles', instance.name, filename)

    name = models.CharField(max_length=100, primary_key=True)
    pancard = models.ImageField(upload_to = get_image_path, default = 'userFiles/default.png', blank=True, null = True)
    aadharcard = models.ImageField(upload_to =get_image_path, default = 'userFiles/default.png', blank=True, null = True)
    passport = models.ImageField(upload_to = get_image_path , default = 'userFiles/default.png', blank=True, null = True)

    def __str__(self):
        return self.name + ' ' + 'UserInfo'















