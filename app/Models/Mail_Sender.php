<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mail_Sender extends Model
{
    use HasFactory;

    static $status = [
        'mail_sender_name' => 'test123@gmail.com', 'test456@gmail.com' ,
        'mail_sender_id' => '4','6'
    ];

    protected $fillable = [
        'mail_sender_send'
    ];

}
