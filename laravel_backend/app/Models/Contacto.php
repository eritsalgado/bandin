<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;
    public function celulares(){
        return $this->hasMany('App\Models\Celular', 'id_contacto');
    }
    public function telefonos(){
        return $this->hasMany('App\Models\Telefono', 'id_contacto');
    }
    public function direcciones(){
        return $this->hasMany('App\Models\Direccion', 'id_contacto');
    }
    public function emails(){
        return $this->hasMany('App\Models\Email', 'id_contacto');
    }
}
