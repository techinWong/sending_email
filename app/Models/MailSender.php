<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MailSender extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'mail_sender_name',
        'mail_sender_send'
    ];
}
