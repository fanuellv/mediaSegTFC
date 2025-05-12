<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class content extends Component
{
    /**
     * Create a new component instance.
     */
    public $imagem;
    public $titulo;
    public $link;
    public function __construct($imagem=null,$titulo,$link=null)
    {
        //
        $this->imagem=$imagem;
        $this->titulo=$titulo;
        $this->link=$link;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.content');
    }
}
