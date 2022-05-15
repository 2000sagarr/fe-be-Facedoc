# Generated by Django 4.0 on 2022-05-11 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_userinfo_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='id',
            field=models.AutoField(default=None, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='name',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
