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
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->string('page')->default('');
            $table->string('name')->default('');
            $table->unsignedInteger('size')->default(0);
            $table->string('type')->default('');
            $table->string('path')->default('');
            $table->text('hash')->nullable();

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
