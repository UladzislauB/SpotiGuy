# Generated by Django 3.1.1 on 2020-09-26 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20200922_1240'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='current_song',
            field=models.PositiveSmallIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='playlist_queue_id',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
