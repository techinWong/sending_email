<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MailAll;

class EmailAllController extends Controller
{
    public function getEmailAll(){
        return MailAll::all();
    }
}
