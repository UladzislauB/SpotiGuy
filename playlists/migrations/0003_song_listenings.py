# Generated by Django 3.1.1 on 2020-09-15 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0002_auto_20200912_1807'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='listenings',
            field=models.IntegerField(default=0),
        ),
    ]
