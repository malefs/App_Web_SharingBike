# Generated by Django 3.1.5 on 2021-01-17 18:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bike',
            fields=[
                ('bikeId', models.AutoField(primary_key=True, serialize=False)),
                ('availStatus', models.BooleanField()),
                ('defectStatus', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('locId', models.AutoField(primary_key=True, serialize=False)),
                ('desc', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('userId', models.AutoField(primary_key=True, serialize=False)),
                ('balance', models.DecimalField(decimal_places=2, default=99.99, max_digits=4)),
                ('userClass', models.CharField(choices=[('customer', 'customer'), ('operator', 'operator'), ('manager', 'manager')], max_length=20)),
                ('name', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('recordId', models.AutoField(primary_key=True, serialize=False)),
                ('beginTime', models.DateTimeField(verbose_name='begin time')),
                ('endTime', models.DateTimeField(null=True)),
                ('beginLocId', models.CharField(max_length=200)),
                ('endLocId', models.CharField(max_length=200, null=True)),
                ('finishedFlag', models.BooleanField(default=False)),
                ('beginLoc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='beginLoc', to='bikesys.location')),
                ('bikeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bikesys.bike')),
                ('endLoc', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='endLoc', to='bikesys.location')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bikesys.user')),
            ],
        ),
        migrations.AddField(
            model_name='bike',
            name='curLocId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bikesys.location'),
        ),
    ]