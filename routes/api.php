<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmailController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('mailgroup',[EmailController::class,'getEmailGroup']);

Route::post('history',[EmailController::class,'showHistory']);

Route::get('mailsender',[EmailController::class,'getEmailSender']);

Route::get('mail/all',[EmailController::class,'getEmailAll']);

Route::post('send',[EmailController::class,'saveHistory']);