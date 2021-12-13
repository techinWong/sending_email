<?php

namespace App\Http\Controllers;

use App\Models\logMail;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(){
        return view('welcome');
    }

    public function showHistory(){
        return view('history');
    }

    
    
}
