<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MailGroup extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'id_group',
        'group_name'
    ];
}
