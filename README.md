# Mini Email Campaign System - Frontend Documentation

## Table of Contents
1. [Login](#1-login)
2. [Registration](#2-registration)
3. [Logout](#3-logout)
4. [Campaign Management](#4-campaign-management)
    - [Create Campaign](#41-create-campaign)
    - [Delete Campaign](#42-delete-campaign)
    - [List Campaigns](#43-list-campaigns)
    - [Auto Update Campaign Status](#44-auto-update-campaign-status)

## 1. Login

**Path**: `/login`  
**Method**: `POST`  
**Description**: Allows users to log in to the system using their email and password.

**Form Fields**:
- **Email**: Required, must be a valid email address.
- **Password**: Required.

**Response**:
- **Success**: Redirects to the `/campaigns` page and sets the authentication token in `localStorage` and Vuex store.
- **Failure**: Displays an error message if credentials are invalid.

**Example**:
```javascript
{
  email: 'user@example.com',
  password: 'password123'
}
# mini-email-campaign-frontend
