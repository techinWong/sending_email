<?php

namespace App\Http\Controllers\API;

use App\Mail\TestMail;
use App\Http\Controllers\Controller;
use App\Models\MailSender;
use App\Models\MailAll;
use App\Models\logMail;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    

    public function getEmailSender(){
        return MailSender::all();
    }

    public function getEmailAll(){
        return MailAll::all();
    }

    public function saveHistory(Request $request){

        // $input = $request->all();

        
        $logMail = new logMail;
        $logMail->sender_mail = $request->input('sender');
        $logMail->user_send = $request->input('receiver');
        $logMail->topic_mail = $request->input('topic');
        $logMail->detail_mail = $request->input('detail');
        $logMail->save();

        $details = [
            'title' => 'This is mail From Txchin',
            'body' => 'This is for testing mail using gmail'
        ];

        \Mail::to("easterzoda@gmail.com")->send(new TestMail($details));
        
        
        return response()->json([
            'status' => 200 ,
            'message'=> 'Success Email have been sent'
        ]);
    }

    public function showHistory(){
        return logMail::all();
    }

    

}
