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
            $table->id('id_log_mail');
            $table->integer('id_user');
            $table->integer('id_mail_sender');
            $table->integer('id_group');
            $table->string('sender_mail');
            $table->string('group_name');
            $table->string('topic_mail');
            $table->string('detail_mail');
            $table->string('user_send');
            $table->string('status');
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
