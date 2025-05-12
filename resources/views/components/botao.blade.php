<div class="flex items-center">
    @if ($icon)
        <x-dynamic-component :component="$icon" class="w-6 h-6 text-black" />
    @endif
    <button class="{{ $cor }} rounded px-4 py-3">{{ $texto }}</button>
</div>
