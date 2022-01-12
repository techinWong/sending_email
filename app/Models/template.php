<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class template extends Model
{
    use HasFactory;
    use softDeletes;

    protected $fillable = [
        'template_id',
        'template_name',
        'template_detail'
    ];
}
