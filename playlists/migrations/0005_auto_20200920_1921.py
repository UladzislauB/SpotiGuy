# Generated by Django 3.1.1 on 2020-09-20 19:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0004_auto_20200916_2106'),
    ]

    operations = [
        migrations.RenameField(
            model_name='album',
            old_name='author',
            new_name='owner',
        ),
    ]
