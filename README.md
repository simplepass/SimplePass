# SimplePass

SimplePass will generate a unique password per domain (including subdomain) and copy it into your pastebuffer. It doesn't store any passwords but it will protect you from phishing as phishing domains != the real domain, which means the password generated will always be wrong.

## Background

A number of years ago this project was created out a personal necessity of mine when I decided to finally use a password manager. I had been putting it off mostly due to my, hopefully understable, unease of using a 3rd party to store my secrets. But I couldn't bring myself to do it! All the companies looked the same, spouting the same platitudes about security and caring about the user. Every password manager I looked at had so many superflous features, at least for my needs, and that worried me. Complexity and insecurity are intimately intertwined as every uncessary feature becomes a possible vector for attack.

Cloud sync? No thanks.

Autofill? What happens when, not _if_, someone works out how to trick this?

Encrypted note taking? Yes, let me put all my secrets in one basket. Maybe I'll scan in my physical ID's to complete the set.

And what the hell is a "Sharing Center" LastPass?!?

So I created SimplePass to fill my niche for a simple, secure, password manager that does its job without all the fuss. It does this by generating a unique password for every website based off the domain, including subdomain, and your master password. It then copies this password into your paste buffer, ready to be ctrl+v'd into the website. This means it doesn't actually store any of your passwords, making it more like a password JIT engine than a vault.

The added bonus from generating your password based off the domain is that it helps mitigate phishing attacks. The phishing domain will invariably be different to the real one therefore making your password different. No matter how convincing the phishing domain and design is, gmaiil.com will generate a different password than gmail.com.

## Password Generation

By default the password generated is a compromise between having a secure password and having one that websites won't take because it's too long/too short/not complex/not complex enough/uses a special character it doesn't like/whatever reason. The password generated is Probably Fine(TM) and that's more honesty than any other vendor will give you.

```
password = sha256(url + your_master_password).slice(14); // hash and get the first 14 characters
password = insertRandomly(password, getRandomUppercaseLetter())
password = insertRandomly(password, getRandomSpecialCharacter());
```

That's not pseudo code, that's the actual code made slighly more readable. I purposely wrote the entire plugin as simply and clearly as I could. This will give you a 16 character password that looks something like `f7K40eda6b635@06`.

## Caveats / Tradeoffs

- Some sites will use a different domain between signing up and logging in, or some combination like this, e.g. signup.site.com vs login.site.com. Obviously your password will be wrong when you do go back to login, but it's not a common occurance.
- The master password is not encrypted in anyway. If you get compromised then so does your password vault, which is what would happen if you were compromised using any other password manager. I just prefer not to live with the false sense of security.
- Lack of features you might want :>