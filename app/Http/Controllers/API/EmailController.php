<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MailSender;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    // function getData(Request $request){
        
    // }

    public function getEmailSender(){
        return MailSender::all();
    }
}
