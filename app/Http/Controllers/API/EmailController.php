<?php

namespace App\Http\Controllers\API;

use App\Mail\TestMail;
use App\Mail\TestMailAttachment;
use App\Http\Controllers\Controller;
use App\Models\MailSender;
use App\Models\MailAll;
use App\Models\logMail;
use App\Models\MailGroup;
use App\Models\template;
use App\Models\files;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Jobs\SendEmail;
use Carbon\Carbon;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function saveEditTemplate(Request $request){
        $id = $request->input('id');
        $template = template::find($id);

        $template->template_name = $request->input('template_name');
        $template->template_detail = $request->input('template_detail');
        $template->save();

    }

    public function editTemplate(Request $request){
        $id = $request->input('id');
        return DB::table('templates')->where('id',$id)->get();
    }

    public function showTemplate(){
        return template::all();
    }

    public function saveTemplate(Request $request){

        $template = new template;
        $template->template_name = $request->input('name');
        $template->template_detail = $request->input('detail');
        $template->save();

        return response()->json([
            'message' => 'Template Save Succesfully'
        ]);
    }


    public function getEmailSender(){
        return MailSender::all();
    }

    public function getEmailAll(){
        return MailAll::all();
    }

    
    public function sendEmail($details ,$mailSendTo,$fileCheck){
        
       
        foreach($mailSendTo as $mailSend){
            if($fileCheck === true){
            \Mail::to($mailSend)->send(new TestMailAttachment($details));
            }
            else{
                \Mail::to($mailSend)->send(new TestMail($details));
            }
        }
        
    }



    public function saveHistory(Request $request){

        $fileCheck = false;

        if($request->file('file')){
            $validated = $request->validate([
                'file' => 'mimes:jpg,png,pdf|max:2048'
            ]);
    
            $files = new files;
    
            $fileName = time().'_'.$request->file->getClientOriginalName();
            $filePath = '/storage/' .$request->file('file')->storeAs('uploads', $fileName, 'public');
            $fileSize = $request->file->getSize();
            $fileType = $request->file->getMimeType();
            $hash = hash_file('sha256', Storage::path('public/uploads/' . $fileName));
            $fileCheck = true;

            $files->name = $fileName;
            $files->size = $fileSize;
            $files->type = $fileType;
            $files->path = $filePath;
            $files->hash = $hash;
            $files->owner_id = '0';
            $files->save();
        }

        


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
        if($fileCheck === true){
            $logMail->file_id = DB::table('files')->where('name',$fileName)->pluck('id')->first();
        }
        $logMail->save();

        if($fileCheck === true){
            $details = [
                'title' => $request->input('topic'),
                'body' => $request->input('detail'),
                'filePath' => $filePath
            ];
        }
        else{
            $details = [
                'title' => $request->input('topic'),
                'body' => $request->input('detail')
            ];
        }

        // $details = [
        //     'email' => 'easterzoda@gmail.com' ,
        //     'title' => $request->input('topic'),
        //     'body' => $request->input('detail')
        // ];

        // SendEmail::dispatch($details);


        // $count = 0;

        $this->sendEmail($details,$mailSendTo,$fileCheck);
    
        // foreach($mailSendTo as $mailSend){
        //     $this->sendEmail($details , $mailSend);
        //     // \Mail::to($mailSend)->send(new TestMail($details));
        // }

        return response()->json([
            'status' => 200 ,
            'message'=> 'Success Email have been sent',
            'mailSendto' => $mailSendTo,
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
