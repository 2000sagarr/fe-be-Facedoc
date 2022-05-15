from django.db import models
from django.contrib.auth.models import  BaseUserManager, AbstractBaseUser
import os
from django.core.validators import RegexValidator
from django.db.models import ImageField, FileField, signals
from django.conf import settings
import shutil, os, glob, re
from distutils.dir_util import mkpath

# role model
class RoleAssigned(models.Model):
    name = models.CharField(max_length = 100)
    pancard = models.BooleanField(default = False)
    aadharcard = models.BooleanField(default = False)
    passpord = models.BooleanField(default = False)
    driving_license = models.BooleanField(default = False)

    def __str__(self):
        return self.name

# super user
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
    phone_regex = RegexValidator(regex=r'^(0|91)?[7-9][0-9]{9}$',
                                 message="Phone number must be entered in the format: '91723456784'. Up to 12 digits allowed.")
    phone = models.CharField(validators=[phone_regex], max_length=17, blank=False, unique=True)  # validators should be a list
    role = models.ForeignKey(RoleAssigned, related_name='role',on_delete = models.CASCADE, null=True, blank=True, default=None)

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

# image upload model
class CustomImageField(ImageField):
    """Allows model instance to specify upload_to dynamically.
    Model class should have a method like:
        def get_upload_to(self, attname):
            return 'path/to/{0}'.format(self.id)
    """
    def __init__(self, *args, **kwargs):
        kwargs['upload_to'] = kwargs.get('upload_to', 'tmp')

        try:
            self.use_key = kwargs.pop('use_key')
        except KeyError:
            self.use_key = False

        super(CustomImageField, self).__init__(*args, **kwargs)

    def contribute_to_class(self, cls, name):
        """Hook up events so we can access the instance."""
        super(CustomImageField, self).contribute_to_class(cls, name)
        signals.post_save.connect(self._move_image, sender=cls)

    def _move_image(self, instance, **kwargs):
        """
            Function to move the temporarily uploaded image to a more suitable directory
            using the model's get_upload_to() method.
        """
        if hasattr(instance, 'get_upload_to'):
            src = getattr(instance, self.attname)
            if src:
                m = re.match(r"%s/(.*)" % self.upload_to, str(src))
                if m:
                    if self.use_key:
                        dst = "%s/%d_%s" % (instance.get_upload_to(self.attname), instance.id, m.groups()[0])
                    else:
                        dst = "%s/%s" % (instance.get_upload_to(self.attname), m.groups()[0])
                    basedir = "%s/%s/" % (settings.MEDIA_ROOT, os.path.dirname(dst))
                    mkpath(basedir)
                    shutil.move("%s/%s" % (settings.MEDIA_ROOT, src),"%s/%s" % (settings.MEDIA_ROOT, dst))
                    setattr(instance, self.attname, dst)
                    instance.save()

    def db_type(self, db):
        """Required by Django for ORM."""
        return 'varchar(100)'

# user information model
class UserInfo(models.Model):

    id = models.AutoField(primary_key=True, null=False)

    def get_upload_to(self, attname):
            return 'userFiles/{0}/{1}'.format(self.id, attname)

    def get_image_path(instance, filename):
        print(instance.id)
        return os.path.join('userFiles', str(instance.pk), filename)

    name = models.CharField(max_length=20, null=True, blank=True)
    pancard = CustomImageField(use_key=True, upload_to='tmp', default = 'userFiles/default.png', blank=True, null = True)
    aadharcard = CustomImageField(use_key=True, upload_to='tmp', default = 'userFiles/default.png', blank=True, null = True)
    passport =  CustomImageField(use_key=True, upload_to='tmp' , default = 'userFiles/default.png', blank=True, null = True)
    driving_license = CustomImageField(use_key=True, upload_to='tmp' , default = 'userFiles/default.png', blank=True, null = True)
    def __str__(self):

        return str(self.name) + ' ' + 'UserInfo'















