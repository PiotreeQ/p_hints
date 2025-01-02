local isHintVisible = false

local Hints = {}

Hints.hideHintUI = function()
    if not isHintVisible then return end

    SendNUIMessage({action = 'hideHintUI'})
    SetTimeout(750, function() isHintVisible = false end)
end

Hints.showHintUI = function(data)
    if isHintVisible then
        Hints.hideHintUI()
        while isHintVisible do Citizen.Wait(100) end
    end
    isHintVisible = true
    SendNUIMessage({
        action = 'showHintUI',
        title = data.title,
        text = data.text,
        position = data.position or 'center-left',
        timeout = data.timeout
    })
    if data.timeout then
        SetTimeout(data.timeout, Hints.hideHintUI)
    end
end

exports('showHintUI', Hints.showHintUI)
exports('hideHintUI', Hints.hideHintUI)
exports('isHintActive', function() return isHintVisible end)
exports('GetHints', function() return Hints end)