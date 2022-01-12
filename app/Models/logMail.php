<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class logMail extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'mail_sender_id',
        'group_id',
        'mail_sender',
        'group_name',
        'mail_topic',
        'mail_detail',
        'user_send',
        'status'
    ];
}
