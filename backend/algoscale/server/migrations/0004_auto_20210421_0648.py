# Generated by Django 3.1.3 on 2021-04-21 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20210421_0621'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactus',
            name='message',
            field=models.TextField(max_length=500),
        ),
    ]