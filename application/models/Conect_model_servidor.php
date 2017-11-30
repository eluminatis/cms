<?php

/* codigo que impossibilita o acesso direto sem passar pela home */
defined('BASEPATH') OR exit('No direct script access allowed');
/* todo controller DEVE extender CI_Controller */

class Conect_model extends CI_Model {
  /* construtor da classe que carregar os principais helpers
    que podem ser usados dentro de toda a classe */

  function __construct() {
    /* contrutor da classe pai */
    parent::__construct();
    /* abaixo deverão ser carregados helpers, libraries e models utilizados
      por este model */
  }
  
  public static function conectar() {
    $con = Conect_model::gerarPDO();
    return $con;
  }

  private static function gerarPDO() {
    //endereço do host
    $host = "localhost";
    //nome do banco de dados
    $banco = "buscasma_site";
    //login do MySQL
    $login = "buscasma_user";
    //senha do MySQL
    $senha = "w2Gt0hsRMt]l";
    //criando a conexão
    $con = new PDO("mysql:host=$host;dbname=$banco", "$login", "$senha");
    return $con;
  }

}