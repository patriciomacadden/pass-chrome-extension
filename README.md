# pass chrome extension

`pass chrome extension` is a Google Chrome extension for
[zx2c4's pass](http://www.passwordstore.org/). It's based on
[dotjs](https://github.com/defunkt/dotjs).

## Things pass chrome extension does

* Retrieves passwords for the current tab website
* Fills in username/password and submits the login form (auto login)

## Things pass chrome extension does not

* Manage passwords

## Requirements

* `pass`. Obviously, `pass` must be installed and working.
`pass chrome extension` need `pass` to have a certain format:

```
Password Store
├── facebook.com
│   └── patriciomacadden@gmail.com.gpg
```

* Ruby. Any vendored ruby would be fine since it doesn't use any gem.
* Google Chrome

## How it works

* `pass` runs a tiny webserver on port 3131.
* When you click on the `pass` icon, it will query for passwords for the
current tab domain. For example, if you visit `http://www.facebook.com`, it
will query for passwords for `facebook.com`.
* If one or more passwords match the domain, it will let you choose which one
you'd like to use.
* Once you click on the desired option, it will fill in username and password
into the sign in box (if any).

## Installing

## Uninstalling

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

See the [LICENSE](https://github.com/patriciomacadden/pass-chrome-extension/blob/master/LICENSE).
