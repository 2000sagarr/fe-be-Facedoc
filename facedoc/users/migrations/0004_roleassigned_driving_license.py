# Generated by Django 4.0 on 2022-05-14 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_userinfo_driving_license'),
    ]

    operations = [
        migrations.AddField(
            model_name='roleassigned',
            name='driving_license',
            field=models.BooleanField(default=False),
        ),
    ]
