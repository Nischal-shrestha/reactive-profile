<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('check', 'AuthController@me');
    Route::post('login', 'AuthController@login')->name('auth.login');
    Route::post('register', 'AuthController@register')->name('auth.register');
    Route::post('logout', 'AuthController@logout')->name('auth.logout');
    Route::post('me', 'AuthController@me')->name('auth.me');

    Route::post('user/all', 'UserController@all')->name('user.all');
    Route::post('user/{id}', 'UserController@show')->name('user.show');

    Route::view('/{path?}', 'spa')->where('path', '.*')->name('react');

});

