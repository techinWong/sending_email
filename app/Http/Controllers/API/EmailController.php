<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MailSender;
use App\Models\MailAll;
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
}
