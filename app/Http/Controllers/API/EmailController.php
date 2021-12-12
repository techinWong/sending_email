<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Mail_Sender;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    // function getData(Request $request){
        
    // }

    public function getEmailSender(){
        $mailSender = DB::table('tbl_mail_sender')->get();
        return $mailSender;
    }
}
