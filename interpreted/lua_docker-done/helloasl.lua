function helloFrom(location)
    print( "Hello from " .. location .. ".")
    print("Today is " .. os.date("%A") ..", "  .. os.date("%x"))
end

print(helloFrom("ASA"))

