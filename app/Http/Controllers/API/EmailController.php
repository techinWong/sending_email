<?php

namespace App\Http\Controllers\API;

use App\Mail\TestMail;
use App\Http\Controllers\Controller;
use App\Models\MailSender;
use App\Models\MailAll;
use App\Models\logMail;
use App\Models\MailGroup;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    

    public function getEmailSender(){
        return MailSender::all();
    }

    public function getEmailAll(){
        return MailAll::all();
    }

    public function sendEmail($details ,$mailSend){
        \Mail::to($mailSend)->send(new TestMail($details));
    }



    public function saveHistory(Request $request){

        // $input = $request->all();

        $receiver = $request->input('receiver');
        $mailSendTo = DB::table('mail_alls')->where('mail_type',$receiver)->pluck('mail_name');
        
        $logMail = new logMail;
        $logMail->sender_mail = $request->input('sender');
        $logMail->user_send = $receiver;
        $logMail->topic_mail = $request->input('topic');
        $logMail->detail_mail = $request->input('detail');
        $logMail->save();

        $details = [
            'title' => 'This is test mail Loop From Txchin',
            'body' => 'This is for testing test loop mail using gmail'
        ];

    foreach($mailSendTo as $mailSend){
        $this->sendEmail($details , $mailSend);
        // \Mail::to($mailSend)->send(new TestMail($details));
    }
        
        
        return response()->json([
            'status' => 200 ,
            'message'=> 'Success Email have been sent',
            'mailSendto' => $mailSendTo
        ]);
    }

    public function showHistory(){
        return logMail::all();
    }

    public function getEmailGroup(){
        return MailGroup::all();
    }

    

}
