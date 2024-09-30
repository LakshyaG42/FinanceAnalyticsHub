from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from social_django.utils import load_strategy, load_backend
from social_core.actions import do_complete
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()

        return JsonResponse({'success': 'User created successfully'}, status=201)


@csrf_exempt
def google_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')

        # Load the backend for Google OAuth2
        strategy = load_strategy(request)
        backend = load_backend(strategy=strategy, name='google-oauth2', redirect_uri=None)

        try:
            # Use the token to authenticate the user
            user = backend.do_auth(token)
            if user and user.is_active:
                login(request, user)  # Log the user in
                return JsonResponse({'message': 'Logged in successfully'}, status=200)
            else:
                return JsonResponse({'error': 'Authentication failed'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)