<div class="flex bg-gray-200 p-5">
    <!-- Waste no more time arguing what a good man should be, be one. - Marcus Aurelius -->
    <div class="w-3/4 space-y-4">
        <h1 class="font-bold text-lg">{{$titulo}}</h1>
    <p class="w-[90%]">{{$descricao}}</p>
    <a href="{{$link}}" class="flex">Ver Mais <x-eva-arrow-ios-forward class="w-5"/></a>
    </div>
    <div class="w-1/4 h-full flex items-center justify-center">
        @if ($icon)
            <x-dynamic-component 
                :component="$icon" 
                class="w-full h-full text-[#0153A5]" 
            />
        @endif
    </div>
</div>