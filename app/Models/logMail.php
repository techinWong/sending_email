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
        'id_user',
        'id_mail_sender',
        'id_group',
        'sender_mail',
        'group_name',
        'topic_mail',
        'detail_mail',
        'user_send',
        'status'
    ];
}
