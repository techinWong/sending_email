<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class files extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'file_page',
        'file_name',
        'file_size',
        'file_type',
        'file_path',
        'file_hash',
        'owner_id',
        'agent_id',
        'admin_id',
    ];
}
