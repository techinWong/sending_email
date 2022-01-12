<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MailAll extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'mail_all_id',
        'mail_name',
        'mail_send',
        'mail_type'
    ];
}
