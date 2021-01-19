<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::resource('/contactos','App\Http\Controllers\ContactoController');
Route::resource('/celulares','App\Http\Controllers\CelularesController');
Route::resource('/telefonos','App\Http\Controllers\TelefonosController');
Route::resource('/emails','App\Http\Controllers\EmailsController');
Route::resource('/direcciones','App\Http\Controllers\DireccionesController');

Route::post('/buscar_nombre','App\Http\Controllers\ContactoController@buscarPorNombre');
Route::post('/buscar_celular','App\Http\Controllers\ContactoController@buscarPorCelular');
Route::post('/buscar_telefono','App\Http\Controllers\ContactoController@buscarPorTelefono');
Route::post('/buscar_email','App\Http\Controllers\ContactoController@buscarPorEmail');
Route::post('/contactos_especificos','App\Http\Controllers\ContactoController@contactos_especificos');