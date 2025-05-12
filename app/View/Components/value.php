<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class value extends Component
{
    /**
     * Create a new component instance.
     */
    public $titulo;
    public $descricao;
    public $link;
    public $icon;
    public function __construct($titulo,$descricao,$link =null,$icon)
    {
        $this->titulo=$titulo;
        $this->descricao=$descricao;
        $this->link=$link;
        $this->icon=$icon;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.value');
    }
}
