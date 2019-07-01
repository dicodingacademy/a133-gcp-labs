<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/Dashboard
	 *	- or -
	 * 		http://example.com/index.php/Dashboard/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/Dashboard/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	function __construct() {
		parent::__construct();

		$this->load->helper('url');
        $this->load->model('record_model');
	}

	public function index()
	{
		$data['data'] = $this->record_model->getDataCount();
		$data['records'] = $this->record_model->getLastTenRecords();
		$data['incomes'] = $this->record_model->getTopExpense();
		$this->load->view('dashboard', $data);
	}
}
