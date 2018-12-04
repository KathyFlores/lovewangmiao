from django.db import models

# Create your models here.
class Video(models.Model):
    name = models.CharField(max_length=128, unique=True)
    url = models.CharField(max_length=512)
    front = models.CharField(max_length=512)

    def __str__(self):
        return self.name

    def make_response_data(self, auth=True):
        video = {'pid': self.id, 'name': self.name, 'url': '', 'front': self.front}
        if auth == True:
            video['url'] = self.url
        return video
