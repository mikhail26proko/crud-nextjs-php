<?php
    class DB {

        private $file;
        private $db  = [];

        public function __construct($file="lpu.json"){
            $this -> file = $file;
            $this -> db = json_decode(file_get_contents('lpu.json'));   
        }

        public function readAll($data){
            return $this->db->LPU;
        }

        public function maxIndex(){
            return max(array_column($this->db->LPU, 'id'));
        }

        public function isHaveAChild($id){
            return in_array($id, array_column($this->db->LPU,"hid"));
        }

        private function fullupdate($new_db){
            $data = json_encode($new_db, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
            file_put_contents($this-> file, $data);
            return ['status'=> "succes"];
        }

        public function create($data){
            $this -> db -> LPU [] = [
                "id"        => ($this -> maxIndex() + 1),
                "hid"       => $data['hid'] ? $data['hid'] : null,
                "full_name" => $data['full_name'] ? $data['full_name'] : null,
                "address"   => $data['address'] ? $data['address'] : null,
                "phone"     => $data['phone'] ? $data['phone'] : null,
            ];
            $this->fullupdate($this->db);
        }

        public function read($data){
            $id = $data['id'];
            foreach ($this -> db -> LPU as $item){
                if ($item -> id == $id){
                    return $item;
                }
            }
        }

        public function update($data){
            foreach ($this->db->LPU as &$item){
                if ($item->id == $data['id']){
                    $item -> hid        = $data['hid']
                        ? $data['hid'] : $item->hid;
                    $item -> full_name  = $data['full_name']
                        ? $data['full_name'] : $item->full_name;
                    $item -> address    = $data['address']
                        ? $data['address'] : $item->address;
                    $item -> phone      = $data['phone']
                        ? $data['phone'] : $item->phone;
                    
                    return $this->fullupdate($this->db);
                }
            }
            unset($item);
            $this->fullupdate($this->db);
        }

        public function delete($data){
            $id = $data['id'];
            foreach ($this->db->LPU as $key => $item){
                if ($item->id == $id){
                    unset($this->db->LPU[$key]);
                    $this->db->LPU=array_values($this->db->LPU);
                    return $this->fullupdate($this->db);
                }
            }
            unset($item);
            return $this->fullupdate($this->db);
        }

        public function getChildByHeadID($data){
            $id = $data['id'];
            $return = $this->db->LPU;
            return array_filter($return,function($item) use($id){
                return $item->hid == $id;
            });
        }

        public function readAllHead($data){
            $return = $this->db->LPU;
            
            $return = array_values(array_filter($return, function($item){
                return is_null($item -> hid);
            }));
            // return $return;

            foreach ($return as &$item){
                $item->child = $this -> isHaveAChild($item->id);
            }
            return $return;
        }
        
    }
?>