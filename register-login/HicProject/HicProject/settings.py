from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-zvo0zo95cksy16r9qlqsmdnj=2r$m^!&(y+29eqpq@*%%p62xv'

DEBUG = True

ALLOWED_HOSTS = []


# ========== INSTALLED APPS ==========
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'accounts',
]


# ========== MIDDLEWARE ==========
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'HicProject.urls'


# ========== TEMPLATES ==========
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'HicProject.wsgi.application'


# ========== DATABASE ==========
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ========== PASSWORD VALIDATION ==========
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ========== INTERNATIONALIZATION ==========
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ========== STATIC FILES ==========
# ========== STATIC FILES ==========
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR.parent.parent / "css",
    BASE_DIR.parent.parent / "js",
    BASE_DIR.parent.parent / "img",
    BASE_DIR.parent.parent / "cards",
    BASE_DIR.parent.parent / "coins",
    BASE_DIR / "static"
]

STATIC_ROOT = BASE_DIR / "staticfiles"





# ========== MEDIA FILES (for profile photos) ==========
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# ========== LOGIN SYSTEM ==========
LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/profile/'
LOGOUT_REDIRECT_URL = '/login/'


# ========== EMAIL RESET PASSWORD (GMAIL SMTP) ==========
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'harpreeta302@gmail.com'
EMAIL_HOST_PASSWORD = 'ijrt btgb wudp fzad'   # ⚠ Replace with environment variable soon!

DEBUG = True

TEMPLATES[0]['OPTIONS']['debug'] = True

