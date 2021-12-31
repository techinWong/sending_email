<?php

namespace App\Http\Controllers\API;

use App\Mail\TestMail;
use App\Http\Controllers\Controller;
use App\Models\MailSender;
use App\Models\MailAll;
use App\Models\logMail;
use App\Models\MailGroup;
use App\Models\files;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Jobs\SendEmail;
use Carbon\Carbon;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    

    public function getEmailSender(){
        return MailSender::all();
    }

    public function getEmailAll(){
        return MailAll::all();
    }

    
    public function sendEmail($details ,$mailSendTo){
        
        
        foreach($mailSendTo as $mailSend){
            \Mail::to($mailSend)->send(new TestMail($details));
        }
    }



    public function saveHistory(Request $request){

        $validated = $request->validate([
            'file' => 'required|mimes:jpg,png,pdf|max:2048'
        ]);

        $files = new files;

        $fileName = time().'_'.$request->file->getClientOriginalName();
        $filePath = '/storage/' .$request->file('file')->storeAs('uploads', $fileName, 'public');
        $fileSize = $request->file->getSize();
        $fileType = $request->file->getMimeType();
        $hash = hash_file('sha256', Storage::path('public/uploads/' . $fileName));


        // $fileModel->name = time().'_'.$req->file->getClientOriginalName();
        // $fileModel->file_path = '/storage/' . $filePath;
        // $input = $request->all();
        // $files = new files;
        
        // $file = $request->input('file');

        // $fileRequest = json_decode($fileRequest,true);
        // $files->name = $fileRequest['name'];
        // $files->type = $request->input('file')->getMimeType();
        // $files->size = $request->input('file')->getSize();

        // $fileName = time().'.'.$request->file->extension();  
        // $inputs = $request->all();
        // $filename = $inputs['file'] ?? $request->file->getClientOriginalName();
        // if (isset($inputs['file']) && !empty($inputs['file'])) {
        //     $filename = $inputs['file'];
        // }

        // $originalName = $request->file->getClientOriginalName();
        // $name = $filename . '_' . time() . '.' . $request->file->extension();
        // $path = $request->file('file')->storeAs('files' , $filename, 'public');
        // // $path = '/storage/' . $request->file('file')->storeAs('uploads', $name, 'public');
        // // $path = $request->file('file')->store('public/files');
        // $size = $request->file->getSize();
        // $type = $request->file->getMimeType();
        // $hash = hash_file('sha256', $path);


        $id_receiver = $request->input('receiver');
        $id_sender = $request->input('sender');

        $mailSendTo = DB::table('mail_alls')->where('mail_type',$id_receiver)->pluck('mail_name');
        if($id_receiver == '1'){
            $mailSendTo = DB::table('mail_alls')->pluck('mail_name');
        }
        
        $logMail = new logMail;
        $logMail->sender_mail = DB::table('mail_senders')->where('id_mail_sender',$id_sender)->pluck('mail_sender_send')->first();
        $logMail->group_name = DB::table('mail_senders')->where('id_mail_sender',$id_sender)->pluck('mail_sender_name')->first();

        // $logMail->user_send = $receiver;
        $logMail->user_send = DB::table('mail_groups')->where('id_group',$id_receiver)->pluck('group_name')->first();
        $logMail->topic_mail = $request->input('topic');
        $logMail->detail_mail = $request->input('detail');
        $logMail->id_mail_sender = $id_sender;
        $logMail->id_group = $id_receiver;
        $logMail->status = '200';
        $logMail->save();

        $details = [
            'title' => $request->input('topic'),
            'body' => $request->input('detail'),
            'filePath' => $filePath
        ];

        // $details = [
        //     'email' => 'easterzoda@gmail.com' ,
        //     'title' => $request->input('topic'),
        //     'body' => $request->input('detail')
        // ];

        // SendEmail::dispatch($details);


        // $count = 0;

        $this->sendEmail($details,$mailSendTo);
    
        // foreach($mailSendTo as $mailSend){
        //     $this->sendEmail($details , $mailSend);
        //     // \Mail::to($mailSend)->send(new TestMail($details));
        // }

        return response()->json([
            'status' => 200 ,
            'message'=> 'Success Email have been sent',
            'mailSendto' => $mailSendTo,
            'fileName' => $request->file('file')->getClientOriginalName(),
            'type' => $request->file->getMimeType(),
            'size' => $request->file->getSize(),
            'hash' => $hash,
            'path' => $filePath
        ]);
    
    }

    public function showHistory(Request $request){
        // $select = $request->input('value');
        // if($select === '1' || $select === '0'){
        //     return logMail::all();
        // }
        // else{
        //     return logMail::latest()->get();
        // }

        $fromDate = $request->input('fromDate');
        $toDate = $request->input('toDate');
        $year = $request->input('year');
        $yearChecked = $request->input('yearChecked');
        $dateChecked = $request->input('dateChecked');

        $logMail = new logMail;

        if($dateChecked === true){
            return $logMail->whereBetween('created_at',[$fromDate,$toDate])->get();
        }
        else {
            return $logMail->whereYear('created_at',$year)->get();
        }
    }

    public function getEmailGroup(){
        return MailGroup::all();
    }

    

}
