<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogMailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log_mails', function (Blueprint $table) {
            $table->id('log_mail_id');
            $table->integer('user_id')->nullable();
            $table->integer('mail_sender_id')->nullable();
            $table->integer('group_id')->nullable();
            $table->string('mail_sender');
            $table->string('group_name')->nullable();
            $table->string('mail_topic');
            $table->string('mail_detail');
            $table->integer('file_id')->nullable();
            $table->string('user_send');
            $table->string('status')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_mails');
    }
}
