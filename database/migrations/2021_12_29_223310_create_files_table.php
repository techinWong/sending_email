<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id('file_id');
            $table->timestamps();
            $table->softDeletes();

            $table->string('file_page')->default('');
            $table->string('file_name')->default('');
            $table->unsignedInteger('file_size')->default(0);
            $table->string('file_type')->default('');
            $table->string('file_path')->default('');
            $table->text('file_hash')->nullable();

            $table->foreignId('owner_id');
            $table->foreignId('agent_id')->nullable();
            $table->foreignId('admin_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
